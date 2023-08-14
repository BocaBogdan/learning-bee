import { useEffect, useRef, useState } from "react";

const useSound = (
  sensitivityValue = 100,
  soundSource: string,
  microphoneAccess: boolean,
  setMicrophoneAccess: (microphoneAccess: boolean) => void
) => {
  const sensitivity = useRef(sensitivityValue);
  const micAccess = useRef(microphoneAccess);

  const mediaStream = useRef<MediaStream>();
  const microphone = useRef<MediaStreamAudioSourceNode>();
  const audioContext = useRef<AudioContext>();
  const analyser = useRef<AnalyserNode>();

  const [isPlayingAlarm, setIsPlayingAlarm] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(0);

  const connectMicrophone = async () => {
    const constraints = { audio: true };
    mediaStream.current = await navigator.mediaDevices.getUserMedia(
      constraints
    );
    audioContext.current = new AudioContext();
    analyser.current = audioContext.current.createAnalyser();
    microphone.current = audioContext.current.createMediaStreamSource(
      mediaStream.current
    );
    microphone.current.connect(analyser.current);
  };

  useEffect(() => {
    sensitivity.current = sensitivityValue;
  }, [sensitivityValue]);

  useEffect(() => {
    (async () => {
      micAccess.current = microphoneAccess;

      if (!microphoneAccess) {
        // Stop microphone access
        if (mediaStream.current) {
          mediaStream.current.getTracks().forEach((track) => track.stop());
        }
      } else {
        if (!mediaStream.current?.active) {
          await connectMicrophone();
        }
      }
    })();
  }, [microphoneAccess]);

  useEffect(() => {
    const handleMicrophone = async () => {
      // Request microphone access
      try {
        await connectMicrophone();
        setMicrophoneAccess(true);
        processAudio();
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setMicrophoneAccess(false);
      }
    };

    const processAudio = () => {
      if (analyser.current) {
        analyser.current.fftSize = 2048;
        const bufferLength = analyser.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateNoiseLevel = () => {
          analyser?.current?.getByteFrequencyData(dataArray);

          let total = 0;
          for (let i = 0; i < bufferLength; i++) {
            total += dataArray[i];
          }
          const average = total / bufferLength;

          setNoiseLevel(average * (sensitivity.current / 100));
        };

        const updateInterval = setInterval(updateNoiseLevel, 250); // Adjust the interval as needed

        return () => {
          clearInterval(updateInterval);
        };
      }
    };

    return () => {
      handleMicrophone();
    };
  }, []);

  useEffect(() => {
    if (noiseLevel > 66.66 && !isPlayingAlarm) {
      const audio = new Audio(soundSource);
      setIsPlayingAlarm(true);
      audio.play();
      audio.onended = () => setIsPlayingAlarm(false);
    }
  }, [noiseLevel]);

  return {
    noiseLevel,
  };
};

export default useSound;

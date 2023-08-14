import Sound from "./Sound";
import { ChangeEvent, useEffect, useState } from "react";
import useSound from "./sound.hook";
import { Button } from "../common/Button";
import TextInput from "../common/TextInput";

// sound link demo "https://mixkit.co/free-sound-effects/";
const INITIAL_SOUND_URL =
  "https://assets.mixkit.co/active_storage/sfx/1649/1649-preview.mp3";

const SoundWrapper = () => {
  const [soundUrl, setSoundUrl] = useState(INITIAL_SOUND_URL);
  const [sensitivity, setSensitivity] = useState<number>(
    "" as unknown as number
  );
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean>(false);

  const { noiseLevel } = useSound(
    sensitivity,
    soundUrl,
    microphoneAccess || false,
    setMicrophoneAccess
  );

  const handleSensitivityChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSensitivity(parseFloat(event.target.value));

  const handleSoundUrlChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSoundUrl(event.target.value);

  useEffect(() => {
    const lsSensitivity = localStorage.getItem("hive-sensitivity");

    if (lsSensitivity) {
      setSensitivity(parseInt(lsSensitivity));
    }
  }, []);

  useEffect(() => {
    if (sensitivity) {
      localStorage.setItem("hive-sensitivity", sensitivity.toString());
    }
  }, [sensitivity]);

  return (
    <div className="flex h-full items-start justify-around gap-24">
      <div className="grid gap-4 border rounded-md p-4">
        <h1 className="text-2xl mb-4">Settings</h1>
        <input
          className="my-2"
          type="range"
          min={50}
          max={300}
          onChange={handleSensitivityChange}
          value={sensitivity}
        />
        <TextInput
          placeholder="Sound URL"
          value={soundUrl}
          onChange={handleSoundUrlChange}
        />
        <Button
          type="button"
          className="w-full"
          onClick={() => setMicrophoneAccess(!microphoneAccess)}
        >
          Mic {microphoneAccess ? "on" : "off"}
        </Button>
      </div>
      <Sound noiseLevel={noiseLevel} />
    </div>
  );
};

export default SoundWrapper;

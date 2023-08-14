export interface AbacusRowProps {
  showNumber?: boolean;
  beadsColor: string[];
}

export interface AbacusProps {
  rowsNumber: number;
  rowsProps: AbacusRowProps[];
  showAllNumbers?: boolean;
}

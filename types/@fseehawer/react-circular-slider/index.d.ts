declare module '@fseehawer/react-circular-slider';

import React from 'react';

export interface CircularSliderProps {
  width?: number;
  direction?: number;
  min?: number;
  max?: number;
  data?: number[] | string[];
  dataIndex?: number;
  knobColor?: string;
  knobSize?: number;
  hideKnob?: boolean;
  knobDraggable?: boolean;
  knobPosition?: string;
  label?: string;
  labelColor?: string;
  labelBottom?: boolean;
  labelFontSize?: string;
  valueFontSize?: string;
  appendToValue?: string;
  prependToValue?: string;
  renderLabelValue?: JSX.Element;
  verticalOffset?: string;
  hideLabelValue?: boolean;
  progressColorFrom?: string;
  progressColorTo?: string;
  progressSize?: number;
  progressLineCap?: string;
  trackColor?: string;
  trackSize?: number;
  onChange?: (value: number) => void;
}

declare const CircularSlider: React.FC<CircularSliderProps>;

export default CircularSlider;

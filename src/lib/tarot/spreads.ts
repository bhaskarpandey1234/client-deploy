export interface SpreadPos {
  id: string;   // e.g., "past"
  label: string;// display
  x: number;    // 0..1 (relative in container)
  y: number;    // 0..1
}
export interface Spread {
  key: 'three' | 'celtic';
  name: string;
  positions: SpreadPos[];
}

// 3-Card: Past, Present, Future
export const THREE_CARD: Spread = {
  key: 'three',
  name: 'Three-Card (Past / Present / Future)',
  positions: [
    { id:'past',    label:'Past',    x:0.2,  y:0.5 },
    { id:'present', label:'Present', x:0.5,  y:0.5 },
    { id:'future',  label:'Future',  x:0.8,  y:0.5 },
  ]
};

// Celtic Cross (RWS-style layout)
export const CELTIC_CROSS: Spread = {
  key: 'celtic',
  name: 'Celtic Cross (10)',
  positions: [
    { id:'1', label:'Present',         x:0.35, y:0.50 },
    { id:'2', label:'Challenge',       x:0.35, y:0.50 }, // crosses 1 visually; we offset in CSS
    { id:'3', label:'Subconscious',    x:0.35, y:0.72 },
    { id:'4', label:'Past',            x:0.18, y:0.50 },
    { id:'5', label:'Conscious',       x:0.35, y:0.28 },
    { id:'6', label:'Near Future',     x:0.52, y:0.50 },
    // Staff on the right
    { id:'7', label:'You',             x:0.72, y:0.20 },
    { id:'8', label:'Environment',     x:0.72, y:0.36 },
    { id:'9', label:'Hopes / Fears',   x:0.72, y:0.52 },
    { id:'10',label:'Outcome',         x:0.72, y:0.68 },
  ]
};

export const SPREADS = [THREE_CARD, CELTIC_CROSS] as const;
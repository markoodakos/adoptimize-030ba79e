/// <reference types="vite/client" />

// Fix recharts JSX component type conflicts
declare module 'recharts' {
  export const AreaChart: any;
  export const Area: any;
  export const BarChart: any;
  export const Bar: any;
  export const XAxis: any;
  export const YAxis: any;
  export const CartesianGrid: any;
  export const Tooltip: any;
  export const Legend: any;
  export const ResponsiveContainer: any;
}

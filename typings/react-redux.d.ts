import "react-redux";
declare module "react-redux" {
  export const useSelector: <T>(selector: (state: any) => T, deps?: any[]) => T;
  export const useActions: any;
}

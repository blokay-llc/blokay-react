export type ColorValueHex = `#${string}`;

export type Props = {
  title?: string;
  data: any;
  onReload?: any;
  onBack?: any;
  blockName?: string;
  autoExecuted?: boolean;
};

export interface PropsChart extends Props {
  options: {
    colors?: ColorValueHex[] | string[];
  };
}

export interface PropsTable extends Props {
  onExport?: any;
  options: {
    showHeader?: boolean;
    showPagination?: boolean;
    canExport?: boolean;
    showTitle?: boolean;
    showSearchBar?: boolean;
    canFilter?: boolean;
  };
}

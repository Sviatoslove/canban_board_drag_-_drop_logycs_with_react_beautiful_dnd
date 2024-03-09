const localStorageService = {
  COLUMNS: 'columns',

  setColumns(columns: any): void {
    localStorage.setItem(this.COLUMNS,  JSON.stringify(columns));
  },

  getColumns(): any {
    return JSON.parse(localStorage.getItem(this.COLUMNS) || '{}')!;
  },
};

export default localStorageService;
/**
 * 取得拳種對應icon字串
 */
export function getPunchTypeIconName(type) {
  switch(type) {
    case '2':
      return 'hand peace outline';
    case '0':
      return 'hand rock outline';
    case '5':
      return 'hand paper outline';
    default:
      return '';
  }
}

/**
 * 7段数码管段位定义与字符映射表
 * 
 * 布局示意：
 *    -- a --
 *   |       |
 *   f       b
 *   |       |
 *    -- g --
 *   |       |
 *   e       c
 *   |       |
 *    -- d --   (dp)
 */

export const SEGMENT_MAP = {
  0: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 0 },
  1: { a: 0, b: 1, c: 1, d: 0, e: 0, f: 0, g: 0 },
  2: { a: 1, b: 1, c: 0, d: 1, e: 1, f: 0, g: 1 },
  3: { a: 1, b: 1, c: 1, d: 1, e: 0, f: 0, g: 1 },
  4: { a: 0, b: 1, c: 1, d: 0, e: 0, f: 1, g: 1 },
  5: { a: 1, b: 0, c: 1, d: 1, e: 0, f: 1, g: 1 },
  6: { a: 1, b: 0, c: 1, d: 1, e: 1, f: 1, g: 1 },
  7: { a: 1, b: 1, c: 1, d: 0, e: 0, f: 0, g: 0 },
  8: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1 },
  9: { a: 1, b: 1, c: 1, d: 1, e: 0, f: 1, g: 1 },
};

export const SEGMENTS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

/**
 * 获取指定数字的段状态
 * @param {string|number|null|undefined} input 一位数字 (0-9)
 * @returns {{ segments: Record<string, boolean>, valid: boolean, char: string|null }}
 */
export function getSegmentState(input) {
  if (input === null || input === undefined || input === '') {
    return {
      segments: { a: false, b: false, c: false, d: false, e: false, f: false, g: false },
      valid: false,
      char: null,
      byteCode: 0,
      hexCode: '0x00',
    };
  }

  const str = String(input).trim();
  // 仅支持严格一位数 0-9
  if (!/^[0-9]$/.test(str)) {
    return {
      segments: { a: false, b: false, c: false, d: false, e: false, f: false, g: false },
      valid: false,
      char: str,
      byteCode: 0,
      hexCode: '0x00',
    };
  }

  const num = parseInt(str, 10);
  const rawMap = SEGMENT_MAP[num];
  const state = {};
  let byte = 0;

  SEGMENTS.forEach((seg, index) => {
    const isOn = Boolean(rawMap[seg]);
    state[seg] = isOn;
    if (isOn) {
      byte |= (1 << index);
    }
  });

  return {
    segments: state,
    valid: true,
    char: str,
    byteCode: byte,
    hexCode: '0x' + byte.toString(16).toUpperCase().padStart(2, '0'),
  };
}

/**
 * 更新 DOM 中段码屏的各段状态
 * @param {HTMLElement} displayElement 包含 data-segment 属性的容器或 SVG 元素
 * @param {string|number} digit
 * @returns {ReturnType<typeof getSegmentState>}
 */
export function renderDigitToElement(displayElement, digit) {
  if (!displayElement) return getSegmentState(null);

  const state = getSegmentState(digit);
  const segmentElements = displayElement.querySelectorAll('[data-segment]');

  segmentElements.forEach((el) => {
    const segName = el.getAttribute('data-segment');
    if (segName && state.segments[segName]) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  return state;
}

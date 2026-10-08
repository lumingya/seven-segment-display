import { getSegmentState, SEGMENTS } from './segmentDisplay.js';

document.addEventListener('DOMContentLoaded', () => {
  const displaySvg = document.getElementById('segmentDisplay');
  const digitInput = document.getElementById('digitInput');
  const clearBtn = document.getElementById('clearBtn');
  const numKeys = document.querySelectorAll('.num-key');
  const themeBtns = document.querySelectorAll('[data-set-theme]');
  const pinIndicators = document.querySelectorAll('.pin-indicator');
  const tlmChar = document.getElementById('tlmChar');
  const tlmHex = document.getElementById('tlmHex');
  const tlmCount = document.getElementById('tlmCount');

  let currentDigit = null;

  /**
   * 刷新界面显示与硬件引脚遥测
   * @param {string|number|null} val 
   */
  function updateDisplay(val) {
    const state = getSegmentState(val);
    currentDigit = state.valid ? state.char : null;

    // 1. 更新 7 段 SVG
    SEGMENTS.forEach((seg) => {
      const segEl = displaySvg.querySelector(`[data-segment="${seg}"]`);
      if (segEl) {
        if (state.segments[seg]) {
          segEl.classList.add('active');
        } else {
          segEl.classList.remove('active');
        }
      }
    });

    // 2. 更新下方引脚指示灯
    pinIndicators.forEach((pinEl) => {
      const segName = pinEl.getAttribute('data-pin');
      if (segName && state.segments[segName]) {
        pinEl.classList.add('active');
      } else {
        pinEl.classList.remove('active');
      }
    });

    // 3. 更新输入框显示
    if (digitInput.value !== (currentDigit ?? '')) {
      digitInput.value = currentDigit ?? '';
    }

    // 4. 更新遥测数据
    tlmChar.textContent = currentDigit ?? '-';
    tlmHex.textContent = state.hexCode;
    const activeCount = Object.values(state.segments).filter(Boolean).length;
    tlmCount.textContent = `${activeCount} / 7`;

    // 5. 更新按键高亮状态
    numKeys.forEach((btn) => {
      if (btn.getAttribute('data-num') === currentDigit) {
        btn.classList.add('pressed');
      } else {
        btn.classList.remove('pressed');
      }
    });
  }

  // 输入框事件：输入单字符
  digitInput.addEventListener('input', (e) => {
    const rawVal = e.target.value;
    // 取最后一个输入的字符，限制仅 0-9
    const match = rawVal.match(/[0-9]/g);
    if (match && match.length > 0) {
      const lastDigit = match[match.length - 1];
      updateDisplay(lastDigit);
    } else {
      updateDisplay('');
    }
  });

  // 清空按钮
  clearBtn.addEventListener('click', () => {
    updateDisplay('');
    digitInput.focus();
  });

  // 虚拟键盘按键
  numKeys.forEach((btn) => {
    btn.addEventListener('click', () => {
      const num = btn.getAttribute('data-num');
      updateDisplay(num);
      digitInput.focus();
    });
  });

  // 键盘快捷键响应 (0-9、Backspace、Escape)
  window.addEventListener('keydown', (e) => {
    // 忽略组合键
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key >= '0' && e.key <= '9') {
      updateDisplay(e.key);
    } else if (e.key === 'Backspace' || e.key === 'Escape' || e.key === 'Delete') {
      updateDisplay('');
    }
  });

  // 主题切换
  themeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-set-theme');
      document.body.setAttribute('data-theme', theme);
      themeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 初始化默认显示
  updateDisplay('');
});

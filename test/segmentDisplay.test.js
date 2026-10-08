import test from 'node:test';
import assert from 'node:assert/strict';
import { getSegmentState, SEGMENT_MAP, SEGMENTS } from '../src/segmentDisplay.js';

test('0-9 一位数全部正确映射段码', () => {
  for (let i = 0; i <= 9; i++) {
    const res = getSegmentState(i);
    assert.strictEqual(res.valid, true, `数字 ${i} 应当为 valid`);
    assert.strictEqual(res.char, String(i));

    const expected = SEGMENT_MAP[i];
    SEGMENTS.forEach((seg) => {
      assert.strictEqual(
        res.segments[seg],
        Boolean(expected[seg]),
        `数字 ${i} 的段 ${seg} 状态不匹配`
      );
    });
  }
});

test('特定数字关键段码形状验证', () => {
  // 0: 中间 g 段不亮，其余全亮
  const zero = getSegmentState(0);
  assert.strictEqual(zero.segments.g, false);
  assert.strictEqual(zero.segments.a, true);

  // 1: 仅 b, c 段亮
  const one = getSegmentState('1');
  assert.deepStrictEqual(one.segments, {
    a: false, b: true, c: true, d: false, e: false, f: false, g: false
  });

  // 8: 全亮
  const eight = getSegmentState(8);
  assert.deepStrictEqual(eight.segments, {
    a: true, b: true, c: true, d: true, e: true, f: true, g: true
  });
  assert.strictEqual(eight.hexCode, '0x7F');
});

test('空值与非一位数输入边界保护', () => {
  assert.strictEqual(getSegmentState('').valid, false);
  assert.strictEqual(getSegmentState(null).valid, false);
  assert.strictEqual(getSegmentState(undefined).valid, false);

  // 多位数输入
  const multi = getSegmentState('12');
  assert.strictEqual(multi.valid, false);
  assert.strictEqual(Object.values(multi.segments).every(v => v === false), true);

  // 非法字符
  const invalidChar = getSegmentState('a');
  assert.strictEqual(invalidChar.valid, false);
  assert.strictEqual(Object.values(invalidChar.segments).every(v => v === false), true);
});

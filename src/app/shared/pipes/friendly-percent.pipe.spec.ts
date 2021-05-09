import { FriendlyPercentPipe } from './friendly-percent.pipe';

describe('FriendlyPercentPipe', () => {
  test.each`
    value        | expected
    ${'0'}       | ${'0%'}
    ${0}         | ${'0%'}
    ${'0.0'}     | ${'0.0%'}
    ${0.0}       | ${'0%'}
    ${'1.2'}     | ${'1.2%'}
    ${1.2}       | ${'1.2%'}
    ${'0.0123'}  | ${'0.0123%'}
    ${0.0123}    | ${'0.0123%'}
    ${'99.999'}  | ${'99.999%'}
    ${99.999}    | ${'99.999%'}
    ${'0.999'}   | ${'0.999%'}
    ${0.999}     | ${'0.999%'}
    ${'12'}      | ${'12%'}
    ${12}        | ${'12%'}
    ${'12.537'}  | ${'12.537%'}
    ${12.537}    | ${'12.537%'}
    ${'1.2345'}  | ${'1.2345%'}
    ${1.2345}    | ${'1.2345%'}
    ${'meh'}     | ${'meh%'}
    ${''}        | ${null}
    ${[]}        | ${null}
    ${undefined} | ${null}
    ${null}      | ${null}
  `('should transform a friendly number to a percentage', ({ value, expected }) => {
    const pipe = new FriendlyPercentPipe();
    expect(pipe.transform(value)).toEqual(expected);
  });
});

import gendiff from '../src';

const beforeJson = './__tests__/__fixtures__/json/before.json';
const afterJson = './__tests__/__fixtures__/json/after.json';

const beforeYaml = './__tests__/__fixtures__/yaml/before.yml';
const afterYaml = './__tests__/__fixtures__/yaml/after.yml';

const beforeIni = './__tests__/__fixtures__/ini/before.ini';
const afterIni = './__tests__/__fixtures__/ini/after.ini';

const nestedBeforeJson = './__tests__/__fixtures__/json/nested/before.json';
const nestedAfterJson = './__tests__/__fixtures__/json/nested/after.json';

const equal = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`;

const nestedEqual = `{
  common: {
  setting1: Value 1
  - setting2: 200
  setting3: true
  - setting6: {
  key: value
  }
  + setting4: blah blah
  + setting5: {
  key5: value5
  }
  }
  group1: {
  + baz: bars
  - baz: bas
  foo: bar
  }
  - group2: {
  abc: 12345
  }
  + group3: {
  fee: 100500
  }
}`;

// const nestedEqual = `{
//   common: {
//      setting1: Value 1
//       - setting2: 200
//         setting3: true
//       - setting6: {
//             key: value
//         }
//       + setting4: blah blah
//       + setting5: {
//             key5: value5
//         }
//     }
//     group1: {
//       + baz: bars
//       - baz: bas
//         foo: bar
//     }
//   - group2: {
//         abc: 12345
//     }
//   + group3: {
//         fee: 100500
//     }
// }`;

test('test JSON', () => {
  expect(gendiff(beforeJson, afterJson)).toBe(equal);
});

test('test YAML', () => {
  expect(gendiff(beforeYaml, afterYaml)).toBe(equal);
});

test('test INI', () => {
  expect(gendiff(beforeIni, afterIni)).toBe(equal);
});

test('test nestedJSON', () => {
  expect(gendiff(nestedBeforeJson, nestedAfterJson)).toBe(nestedEqual);
});

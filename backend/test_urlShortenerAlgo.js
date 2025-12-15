const { shortlink, unshortlink } = require('./urlShortenerAlgo');

console.log('Testing urlShortenerAlgo.js...');

const testCases = [
    { input: 2025, expected: 'Wf' },
    { input: 0, expected: '0' },
    { input: 61, expected: 'z' },
    { input: 62, expected: '10' },
    { input: 100000000000, expected: '1l9Zo9o' },
    { input: 843203948308, expected: 'EqOTpqO' },
    { input: 598320839039, expected: 'AX5pGTX' },
    { input: 394802394849, expected: '6wwYc65' },
];

let roundTripPassed = 0;
let forwardPassed = 0;

console.log('--- Forward Tests (Base 10 -> Base 62) ---');
testCases.forEach(({ input, expected }) => {
    const result = shortlink(input);
    if (result === expected) {
        console.log(`PASS: Input ${input} => ${result}`);
        forwardPassed++;
    } else {
        console.error(`FAIL: Input ${input} => Expected ${expected}, got ${result}`);
    }
});

console.log('\n--- Reverse Tests (Base 62 -> Base 10) ---');
testCases.forEach(({ input, expected }) => {
    // expected is the shortlink string
    const result = unshortlink(expected);
    if (result === input) {
        console.log(`PASS: Input '${expected}' => ${result}`);
        roundTripPassed++;
    } else {
        console.error(`FAIL: Input '${expected}' => Expected ${input}, got ${result}`);
    }
});

const totalTests = testCases.length * 2;
const totalPassed = forwardPassed + roundTripPassed;

if (totalPassed === totalTests) {
    console.log('\nAll tests passed successfully!');
} else {
    console.log(`\n${totalPassed}/${totalTests} tests passed.`);
}

/**
 * Minimal stub for the missing `./rust_types` module in
 * `@stellar/stellar-sdk@11.3.0`.
 *
 * The published npm package is broken — contract_spec.js and
 * assembled_transaction.js both require `./rust_types` (or `../rust_types`)
 * but the file was omitted from the tarball.
 *
 * Usage is limited to two constructor calls:
 *   new Ok(value)   — in contract_spec.js
 *   new Err(error)  — in assembled_transaction.js
 *
 * This stub is wired via Jest's moduleNameMapper so only the test runner
 * picks it up; production code is unaffected.
 */
export class Ok {
  value: unknown;
  constructor(value: unknown) {
    this.value = value;
  }
}

export class Err {
  error: unknown;
  constructor(error: unknown) {
    this.error = error;
  }
}

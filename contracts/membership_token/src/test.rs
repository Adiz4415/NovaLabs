#![cfg(test)]

use super::*;
use soroban_sdk::{
    testutils::{Address as _, BytesN as BytesNTestUtils},
    Address, BytesN, Env,
};

#[test]
fn test_set_admin() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(MembershipTokenContract, ());
    let client = MembershipTokenContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let result = client.try_set_admin(&admin);
    assert!(result.is_ok());
}

#[test]
fn test_issue_token() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(MembershipTokenContract, ());
    let client = MembershipTokenContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.set_admin(&admin);

    let id = BytesN::<32>::random(&env);
    let user = Address::generate(&env);
    let expiry = env.ledger().timestamp() + 100000;

    let result = client.try_issue_token(&id, &user, &expiry);
    assert!(result.is_ok());
}

#[test]
fn test_issue_token_already_exists() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(MembershipTokenContract, ());
    let client = MembershipTokenContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.set_admin(&admin);

    let id = BytesN::<32>::random(&env);
    let user = Address::generate(&env);
    let expiry = env.ledger().timestamp() + 100000;

    client.issue_token(&id, &user, &expiry);
    let result = client.try_issue_token(&id, &user, &expiry);
    assert!(result.is_err());
}

#[test]
fn test_issue_token_invalid_expiry() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(MembershipTokenContract, ());
    let client = MembershipTokenContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.set_admin(&admin);

    let id = BytesN::<32>::random(&env);
    let user = Address::generate(&env);
    let past_expiry = 0u64;

    let result = client.try_issue_token(&id, &user, &past_expiry);
    assert!(result.is_err());
}

#[test]
fn test_get_token() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(MembershipTokenContract, ());
    let client = MembershipTokenContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.set_admin(&admin);

    let id = BytesN::<32>::random(&env);
    let user = Address::generate(&env);
    let expiry = env.ledger().timestamp() + 100000;

    client.issue_token(&id, &user, &expiry);

    let token = client.get_token(&id);
    assert_eq!(token.id, id);
    assert_eq!(token.user, user);
    assert_eq!(token.status, MembershipStatus::Active);
}

#[test]
fn test_get_token_not_found() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(MembershipTokenContract, ());
    let client = MembershipTokenContractClient::new(&env, &contract_id);

    let id = BytesN::<32>::random(&env);
    let result = client.try_get_token(&id);
    assert!(result.is_err());
}

#[test]
fn test_transfer_token() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(MembershipTokenContract, ());
    let client = MembershipTokenContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.set_admin(&admin);

    let id = BytesN::<32>::random(&env);
    let user = Address::generate(&env);
    let new_user = Address::generate(&env);
    let expiry = env.ledger().timestamp() + 100000;

    client.issue_token(&id, &user, &expiry);
    let result = client.try_transfer_token(&id, &new_user);
    assert!(result.is_ok());

    let token = client.get_token(&id);
    assert_eq!(token.user, new_user);
}

#[test]
fn test_issue_token_without_admin_fails() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(MembershipTokenContract, ());
    let client = MembershipTokenContractClient::new(&env, &contract_id);

    let id = BytesN::<32>::random(&env);
    let user = Address::generate(&env);
    let expiry = env.ledger().timestamp() + 100000;

    let result = client.try_issue_token(&id, &user, &expiry);
    assert!(result.is_err());
}

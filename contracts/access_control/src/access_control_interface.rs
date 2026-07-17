use soroban_sdk::{contracttype, Address, String};

#[contracttype]
pub struct QueryMsg {
    pub check_access: CheckAccessQuery,
}

#[contracttype]
pub struct CheckAccessQuery {
    pub caller: Address,
    pub required_role: String,
}

#[contracttype]
pub struct AccessResponse {
    pub has_access: bool,
}

// log
import store from "../store";

const fetchDataRequest = () => {
    return {
        type: "CHECK_DATA_REQUEST",
    };
};

const fetchDataSuccess = (payload) => {
    return {
        type: "CHECK_DATA_SUCCESS",
        payload: payload,
    }
}

const fetchDataFailed = (payload) => {
    return {
        type: "CHECK_DATA_FAILED",
        payload: payload,
    };
};

export const fetchData = (account) => {
    return async (dispatch) => {
        dispatch(fetchDataRequest());
        try {
            let allGears = await store
                .getState()
                .blockchain.gearToken.methods.getGears()
                .call();
            let allOwnerGears = await store
                .getState()
                .blockchain.gearToken.methods.getOwnerGears(account)
                .call();

            dispatch(
                fetchDataSuccess({
                    allGears,
                    allOwnerGears,
                })
            );
        } catch (err) {
            console.log(err);
            dispatch(fetchDataFailed("Could not load data from contract."));
        }
    };
};
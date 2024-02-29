export const defaultRequestState = {
    pending: false,
    fulfilled: false,
    rejected: false,
    transactionHash: null
}

export const handlePending = (state) => {
    state.pending = true;
    state.fulfilled = false;
    state.rejected = false;
    state.transactionHash = null;
}

export const handleFulfilled = (state, action) => {
    state.pending = false;
    state.fulfilled = true;
    state.rejected = false;
    state.transactionHash = action.payload.transactionHash;
}

export const handleRejected = (state) => {
    state.pending = false;
    state.fulfilled = false;
    state.rejected = true;
    state.transactionHash = null
}


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, getFeaturedPlaylists, getNewReleases, getToken } from "./operations";

const initialState = {
    newReleasesList: [],
    totalNewReleases: 0,
    featuredPlaylistsList: [],
    categoriesList: [],
    newReleaseLoading: true,
    featuredListLoading: true,
    categoryLoading: true,
    error: "",
    isTokenStored: false,
};

export const fetchNewReleasesList = createAsyncThunk(
    "music/fetchNewReleasesList",
    async (params, { rejectWithValue }) => {
        try {
            const list = await getNewReleases(params);
            return list;
        } catch (err) {
            return rejectWithValue([], err);
        }
    }
);

export const fetchFeaturedPlaylistsList = createAsyncThunk(
    "music/fetchFeaturedPlaylistsList",
    async (params, { rejectWithValue }) => {
        try {
            const list = await getFeaturedPlaylists(params);
            return list;
        } catch (err) {
            return rejectWithValue([], err);
        }
    }
);

export const fetchCategoriesList = createAsyncThunk(
    "music/fetchCategoriesList",
    async (params, { rejectWithValue }) => {
        try {
            const list = await getCategories(params);
            return list;
        } catch (err) {
            return rejectWithValue([], err);
        }
    }
);

export const fetchAccessToken = createAsyncThunk(
    'music/getToken',
    async (_, { rejectWithValue }) => {
        try {
            const token = await getToken();
            return token;
        } catch (err) {
            return rejectWithValue([], err);
        }
    })

const { actions, reducer } = createSlice({
    name: "music",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
        builder.addCase(fetchNewReleasesList.fulfilled, (state, { payload }) => {
            state.newReleasesList = [...state.newReleasesList, ...payload];
            state.newReleaseLoading = false;
            console.log('new fulfill')
        })

            .addCase(fetchNewReleasesList.rejected, (state, { payload, error }) => {
                state.newReleaseLoading = false;
                state.newReleasesList = payload;
                state.error = error;

            })

            .addCase(fetchFeaturedPlaylistsList.fulfilled, (state, { payload }) => {
                state.featuredPlaylistsList = [...state.featuredPlaylistsList, ...payload]
                state.featuredListLoading = false;
            })

            .addCase(fetchFeaturedPlaylistsList.rejected, (state, { payload, error }) => {
                state.featuredListLoading = false;
                state.featuredPlaylistsList = payload;
                state.error = error;
            })

            .addCase(fetchCategoriesList.fulfilled, (state, { payload }) => {
                state.categoriesList = [...state.categoriesList, ...payload];
                state.categoryLoading = false;
            })

            .addCase(fetchCategoriesList.rejected, (state, { payload, error }) => {
                state.categoryLoading = false;
                state.categoriesList = payload;
                state.error = error;
            })

            .addCase(fetchAccessToken.fulfilled, (state, { payload }) => {
                state.isTokenStored = true;
            })
    },
});

export { actions, reducer };
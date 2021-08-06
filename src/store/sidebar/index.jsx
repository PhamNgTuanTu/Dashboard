import { createSlice } from "@reduxjs/toolkit";
const initialSidebar = [
    {
        name: 'Trang Chủ',
        to: '/',
        exact: true,
        icon: "bx bxs-home",
    },
    {
        name: 'Người Dùng',
        to: '/users',
        exact: false,
        icon: "bx bxs-user-account",
    },
    {
        name: 'Thể Loại',
        to: '/category',
        exact: false,
        icon: "bx bxs-category",
    },
    {
        name: 'Nhà Sản Xuất',
        to: '/publishers',
        exact: false,
        icon: "bx bx-buildings",
    },
    {
        name: 'Nhà Cung Cấp',
        to: '/suppliers',
        exact: false,
        icon: "bx bxs-buildings",
    },
    {
        name: 'Tác Giả',
        to: '/authors',
        exact: false,
        icon: "bx bxl-reddit",
    },
    {
        name: 'Sách',
        to: '/books',
        exact: false,
        icon: "bx bx-book",
    },
];
const slice = createSlice({
    name: "sidebar",
    initialState: {
        sidebar: initialSidebar
    },
    reducers: {
    },
});
export default slice.reducer;
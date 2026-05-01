export const styles = {
    layout: {
        page: "flex-1 p-8 bg-slate-100 min-h-screen",
        section: "bg-white rounded-2xl shadow-sm border border-slate-200 p-6",
    },

    sidebar: {
        container: "w-64 min-h-screen bg-emerald-600 text-white p-6",
        title: "text-2xl font-bold mb-8",
        nav: "space-y-2",
        link: "flex px-3 py-2 gap-3 rounded-lg transition font-medium hover:bg-emerald-500",
        activeLink: "bg-emerald-500 shadow-sm text-slate-700",
    },

    header: {
        wrapper: "flex items-center justify-between mb-8",
        title: "text-3xl font-bold text-slate-800",
        subtitle: "text-slate-500 mt-1",
    },

    button: {
        primary:
            "flex gap-2 bg-emerald-600 text-white px-2 py-2 rounded-lg hover:bg-emerald-500 transition",
    },

    card: {
        stat:
            "bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition",
        empty:
            "border border-dashed border-slate-300 rounded-lg p-8 text-center text-slate-500",
        project:
            "bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition",
    },

    grid: {
        stats: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
        main: "grid grid-cols-1 lg:grid-cols-3 gap-6",
        projects: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
    },

    text: {
        sectionTitle: "text-xl font-semibold text-slate-800 mb-4",
        statTitle: "text-sm text-slate-500",
        statValue: "text-2xl font-semibold text-slate-800 mt-2",
    },

    form: {
        label: "mb-2 block text-md font-bold text-slate-700",
        inputField:
            "w-full rounded-lg border border-slate-300 outline-none text-slate-700 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500",
        grid: "grid grid-cols-1 md:grid-cols-2 gap-6",
        error: "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
    },

    badge: {
        status:
            "rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 capitalize",
    },
};
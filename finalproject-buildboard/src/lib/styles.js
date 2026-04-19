export const styles = {
    layout: {
        page: "flex-1 p-8 bg-slate-100 min-h-screen",
        section: "bg-white rounded-2xl shadow-sm border border-slate-200 p-6",
    },

    sidebar: {
        container: "w-64 min-h-screen bg-emerald-600 text-white p-6",
        title: "text-2xl font-bold mb-8",
        nav: "space-y-2",
        link: "block px-3 py-2 rounded-lg transition font-medium hover:bg-emerald-500",
        activeLink: "bg-emerald-500 shadow-sm text-slate-700",
    },

    header: {
        wrapper: "flex items-center justify-between mb-8",
        title: "text-3xl font-bold text-slate-800",
        subtitle: "text-slate-500 mt-1",
    },

    button: {
        primary:
            "bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 transition",
    },

    card: {
        stat:
            "bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition",
        empty:
            "border border-dashed border-slate-300 rounded-lg p-8 text-center text-slate-500",
    },

    grid: {
        stats: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
        main: "grid grid-cols-1 lg:grid-cols-3 gap-6",
    },

    text: {
        sectionTitle: "text-xl font-semibold text-slate-800 mb-4",
        statTitle: "text-sm text-slate-500",
        statValue: "text-2xl font-semibold text-slate-800 mt-2",
    },
};
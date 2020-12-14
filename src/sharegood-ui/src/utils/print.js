var i = "#1475b2"
    , c = "#42c02e"
    , u = function(e) {
    var t = e.title
        , r = e.content
        , n = e.backgroundColor
        , a = ["%c ".concat(t, " %c ").concat(r, " "), "padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ".concat("#606060", ";"), "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ".concat(n, ";")];
    return function() {
        var e;
        window.console && "function" === typeof window.console.log && (e = console).log.apply(e, arguments)
    }
    .apply(void 0, a),
    a
};
export default u;


        // u({title:'Environment',content:'production',backgroundColor:'#1475b2'})
        // u({title:'Platform',content:'shakespeare',backgroundColor:'#42c02e'})
        //    u({title:'Version',content:'1.1.0',backgroundColor:'#42c02e'})
        //     u({title:'Build Date',content:'2020-10-16T10:09:17.655Z',backgroundColor:'#42c02e'})
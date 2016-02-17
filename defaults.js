
module.exports.MAP_CODE = 'function(doc){\n    console.log(doc._id);\n    emit(doc._id, doc);\n}';

var o = [
    {
        _id: 'test_1',
        name: 'Bob'
    },
    {
        _id: 'test_2',
        name: 'Jen'
    },
    {
        _id: 'test_3',
        name: 'Mike'
    },
    {
        _id: 'test_4',
        name: 'Ivan'
    },
    {
        _id: 'test_5',
        name: 'Nicole'
    }
];
module.exports.TEST_DOCS = JSON.stringify(o,null,'\t');
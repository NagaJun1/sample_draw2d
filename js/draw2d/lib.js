
let canvas = null;

/**
 * draw2d のキャンバスを初期化
 */
function initialize_canvas() {
    canvas = new draw2d.Canvas("canvas_id");

    //ドラッグ&ドロップで connectionを作成できるようにする
    canvas.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
        createConnection: function () {

            // 独自の Connection を使用
            return new ConnectionForTableShape({
                //connectionの形状の設定
                router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
            })
        }
    }));

    canvas.getCommandStack().addEventListener(function (e) {
        if (e.isPostChangeEvent()) {
            console.log(canvas.getSelection().all.data);
        }
    });

}

/**
 * ラベル作成
 */
let add_label = function () {
    let label = new draw2d.shape.basic.Label({ text: "テキスト" });
    label.createPort("input");
    label.createPort("output");
    canvas.getCommandStack().execute(new draw2d.command.CommandAdd(canvas, label, 10, 10));
}

/**
 * JSON で出力
 */
let export_json = function () {
    var writer = new draw2d.io.json.Writer();
    writer.marshal(canvas, function (json) {
        console.log(JSON.stringify(json));
    });
}

/**
 * TableShape 作成
 */
let add_table_shape = function () {
    var shape = new TableShape();
    shape.text = 'new object';
    shape.addEntity("child_1");
    shape.addEntity("child_2");
    canvas.getCommandStack().execute(new draw2d.command.CommandAdd(canvas, shape, 10, 10));
}

/**
 * JSON で入力
 */
let import_json = function () {
    var reader = new draw2d.io.json.Reader();
    reader.unmarshal(canvas, jsonDocument);
}
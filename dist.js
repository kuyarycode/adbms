const glob = require("glob");
const { writeFileSync, unlink } = require("fs");

const path = "";

glob("./public_html/build/assets/*.{js,css}", {}, function (er, files) {
    unlink("./resources/views/assets.blade.php", () => {});

    files.map((file) => {
        let html = "";

        if (file.includes(".css")) {
            html = `<link rel="stylesheet" href="{{ url("${file.replace(
                "./public_html",
                path
            )}") }}"/>`;
        }

        if (file.includes(".js")) {
            html = `<script defer type="module" src="{{ url("${file.replace(
                "./public_html",
                path
            )}") }}"></script>`;
        }

        writeFileSync("./resources/views/assets.blade.php", html + "\n", {
            flag: "a",
        });
    });
});

#!/usr/bin/env seed
// ibnu.yahya@toroo.org
Gtk = imports.gi.Gtk;
Gtk.init(null,null);

table = new GType({
	parent: Gtk.Window.type,
	name: "table",
	init: function() {
		ui(this);
		function ui(w) {
			w.signal.hide.connect(Gtk.main_quit);
			w.set_title("Table");
			w.set_default_size(300,200);
			
			var tombol1 = new Gtk.Button({label:"Tombol1"});
			tombol1.set_size_request(100,50);
			var tombol2 = new Gtk.Button({label:"Tombol2"});
			tombol2.set_size_request(100,50);
			var tombol3 = new Gtk.Button({label:"Tombol3"});
			tombol3.set_size_request(100,50);
			var tombol4 = new Gtk.Button({label:"Tombol4"});
			tombol4.set_size_request(100,50);
			
			var table_out = new Gtk.Table({rows:3, columns:2});
			
			table_out.attach_defaults(tombol1,0,1,0,1);
			table_out.attach_defaults(tombol2,1,2,0,1);
			table_out.attach_defaults(tombol3,2,3,1,2);
			table_out.attach_defaults(tombol4,0,1,1,2);
			
			w.add(table_out);
			w.show_all();
		}
	}
});

new table();
Gtk.main();

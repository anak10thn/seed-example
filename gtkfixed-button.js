#!/usr/bin/env seed
// ibnu.yahya@toroo.org

Gtk = imports.gi.Gtk;
Gtk.init(null,null);

button = new GType({
	parent: Gtk.Window.type,
	name : "button",
	init: function() {
		ui(this);
		function ui(w) {
			w.signal.hide.connect(Gtk.main_quit);
			w.set_title("Gtk Fixed and Button");
			w.set_default_size(300,200);
			
			var fixed = new Gtk.Fixed();
			var tombol1 = new Gtk.Button({label:"Tombol1"});
			tombol1.set_size_request(100,50);
			var tombol2 = new Gtk.Button({label:"Tombol2"});
			tombol2.set_size_request(100,50);
			
			fixed.put(tombol1,50,50);
			fixed.put(tombol2,200,50);
			w.add(fixed);
			w.show_all()
		}
	}
});

var tampil = new button();
Gtk.main();

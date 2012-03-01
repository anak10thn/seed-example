#!/usr/bin/env seed
// ibnu.yahya@toroo.org

Gtk = imports.gi.Gtk;
Gtk.init(null,null);

ibnu = new GType({
	parent: Gtk.Window.type,
	name: "ibnu",
	init: function(){
			ui(this);
			function ui(j) {
				j.signal.hide.connect(Gtk.main_quit);
				j.set_default_size(200,300);
				j.set_title("Percobaan");
				var tombol = new Gtk.Button({label:"Hanya percobaan"});
				j.add(tombol);
				j.show_all();
			}
	}
});

var tampil = new ibnu();
Gtk.main();

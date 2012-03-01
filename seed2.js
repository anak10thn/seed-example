#!/usr/bin/env seed
Gtk = imports.gi.Gtk;
Gtk.init(null,null);

ign = new GType({
	parent : Gtk.Window.type,
	name : "ign",
	init: function()
	{
		ui(this);
		
		function ui(w) {
			w.signal.hide.connect(Gtk.main_quit);
			w.set_default_size(200,200);
			w.set_title("IGN Control Panel");
			var fix = new Gtk.Fixed();
			var tombol = new Gtk.Button({label:"Tombol"});
			tombol.set_size_request(100,150);
			fix.put(tombol,50,50);
			w.add(fix);
			w.show_all();
		}	
	}
});

var tampil = new ign();
tampil.init;
Gtk.main();

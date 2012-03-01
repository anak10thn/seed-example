#!/usr/bin/env seed
Gtk = imports.gi.Gtk;
Gtk.init(null,null);

ign = new GType({
	parent: Gtk.Window.type,
	name: "ign",
	init: function(){
		ui(this);
		function ui(j){
			j.signal.hide.connect(Gtk.main_quit);
			j.set_title("IGN Control Panel");
			j.set_default_size(200,150);
			
			var tmb = new Gtk.Button({label:"Tombol"});
			tmb.set_size_request(20,20);
			var fix = new Gtk.Fixed();
			fix.put(tmb);
			j.add(fix);
			j.show_all();
		}
	}
});

var tampil = new ign();
Gtk.main()

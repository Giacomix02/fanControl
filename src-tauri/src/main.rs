// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command


use std::path::{PathBuf, self};
use std::process::Command;
use std::env;

#[tauri::command]
fn turbo_on(app_handle: tauri::AppHandle){

    print!("\n\tTURBO ON\n");

    let path = path(app_handle);
    
    print!("\n\t{}\n", path);

    let output = Command::new("powershell.exe")
        .arg("-ExecutionPolicy")
        .arg("Bypass")
        .arg("-Command")
        .arg(format!("Start-Process powershell.exe -Verb RunAs -ArgumentList '-ExecutionPolicy Bypass -File \"{}\" -MaxFanSpeedOn' -WindowStyle Hidden", path))
        .output()
        .expect("failed to execute process");

    println!("{}", String::from_utf8_lossy(&output.stdout));
}

#[tauri::command]
fn turbo_off(app_handle: tauri::AppHandle){

    print!("\n\tTURBO OFF\n");

    let path = path(app_handle);

    print!("\n\t{}\n",path);

    let output = Command::new("powershell.exe")
    .arg("-ExecutionPolicy")
    .arg("Bypass")
    .arg("-Command")
    .arg(format!("Start-Process powershell.exe -Verb RunAs -ArgumentList '-ExecutionPolicy Bypass -File \"{}\" -MaxFanSpeedOff' -WindowStyle Hidden", path))
    .output()
    .expect("failed to execute process");

println!("{}", String::from_utf8_lossy(&output.stdout));

}

#[tauri::command]
fn manual(app_handle: tauri::AppHandle, mode:String){

    let path = path(app_handle);

    let output = Command::new("powershell.exe")
    .arg("-ExecutionPolicy")
    .arg("Bypass")
    .arg("-Command")
    .arg(format!("Start-Process powershell.exe -Verb RunAs -ArgumentList '-ExecutionPolicy Bypass -File \"{}\" -SetFanMode {}' -WindowStyle Hidden", path, mode))
    .output()
    .expect("failed to execute process");
    
}

#[tauri::command]
fn path(handle: tauri::AppHandle) -> String {
   let resource_path = handle.path_resolver()
      .resolve_resource("./omen-hub-but-better/OmenHwCtl.ps1")
      .expect("failed to resolve resource");

    return resource_path.into_os_string().into_string().unwrap(); 
}


fn main() {
    env::set_var("RUST_BACKTRACE", "1");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![turbo_off, turbo_on,path,manual])
        .run(tauri::generate_context!())
        .expect("error while running application");
}



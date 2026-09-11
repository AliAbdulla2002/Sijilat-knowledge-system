Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c npm start", 0, False
WScript.Sleep 2000
WshShell.Run "http://localhost:3000"
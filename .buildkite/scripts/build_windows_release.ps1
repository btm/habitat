#!/usr/bin/env powershell

#Requires -Version 5
Set-PSDebug -Trace 1

###################
# 'main'
$env:ChocolateyInstall = "$env:ProgramData\Chocolatey"
$ChocolateyHabitatLibDir = "$env:ChocolateyInstall\lib\habitat_native_dependencies\builds\lib"
$ChocolateyHabitatIncludeDir = "$env:ChocolateyInstall\lib\habitat_native_dependencies\builds\include"
$ChocolateyHabitatBinDir = "C:\ProgramData\chocolatey\lib\habitat_native_dependencies\builds\bin"

Write-Host "--- Installing Native Dependencies"
choco install habitat_native_dependencies --confirm -s https://www.myget.org/F/habitat/api/v2  --allowemptychecksums

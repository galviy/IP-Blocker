const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const {
    exec
} = require('child_process');
console.clear();

const device = process.platform;
const fs = require("fs");

console.log('IP Blocker (C) Galvin');


const menu = "\n=================\n(1) - Block IP\n(2) - Unblock IP\n(3) - Exit\n=================\nInput the number: ";

readline.question(menu, function(input) {

    switch (input) {
        case '1':

            if (device == "win32" || device == "win64") {
                console.clear();
                console.log(`\nDevice supported: Windows (${device})`)
                readline.question('Block IP : ', ip => {
                    exec(`netsh advfirewall firewall add rule name="BLACKLIST" dir=in action=block remoteip="${ip}"`, (error, stdout, stderr, spawn) => {

                        if (error) {
                            return console.log("Please run this application as administrator")
                        } else {
                            console.log(`(${device}) - TCP ( ${ip} ) Has been Blocked `)
							fs.appendFileSync("logs" , `Blocked - ${ip}`);
							return
                        }
                    });
                })
            } else if (device == "linux") {
                console.clear();
                console.log(`\ndevice supported: Linux (${device})`)
                readline.question('Block IP : ', ip => {
                    exec(`iptables -A INPUT -s ${ip} -j DROP`, (error, stdout, stderr, spawn) => {

                        if (error) {
                            return console.log("Please run this application as root")
                        } else {
                            exec(`iptables-save`)
                            console.log(`(${device}) - TCP ( ${ip} ) Has been Blocked `)
							fs.appendFileSync("logs" , `Blocked - ${ip}`);
                        }
                    });
                })
            } else if (device == "darwin") {
                console.clear();
                console.log(`\nDevice supported: MacOS (${device})`)
                readline.question('Block IP: ', ip => {
                    exec(`sudo ipfw add deny src-ip ${ip}`, (error, stdout, stderr, spawn) => {

                        if (error) {
                            return console.log("Please run this application as root")
                        } else {
                            console.log(`(${device}) - TCP ( ${ip} ) Has been blocked`)
							fs.appendFileSync("logs" , `Blocked - ${ip}`);
                        }
                    });
                });
            }
            break;

        case '2':
            if (device == "win32" || device == "win64") {
                console.clear();
                console.log(`\nDevice supported: Windows (${device})`)
                readline.question('Unblock IP : ', ip => {
                    exec(`netsh advfirewall firewall delete rule name="BLACKLIST" remoteip="${ip}"`, (error, stdout, stderr, spawn) => {

                        if (error) {
                            return console.log("Please run this application as administrator");
                        } else {
                            console.log(`(${device}) - TCP ( ${ip} ) Has been Blocked `);
                        }
                    });
                })
            } else if (device == "linux") {
                console.clear();
                console.log(`\nDevice supported: Linux (${device})`)
                readline.question('Unblock IP : ', ip => {
                    exec(`iptables -D INPUT -s ${ip} -j DROP`, (error, stdout, stderr, spawn) => {

                        if (error) {
                            return console.log("Please run this application as root");
                        } else {
                            exec(`iptables-save`)
                            console.log(`(${device}) - TCP ( ${ip} ) Has been Blocked `);
                        }
                    });
                })
            } else if (device == "darwin") {
                console.clear();
                console.log(`\nDevice supported: MacOS (${device})`)
                readline.question('Unblock IP: ', ip => {
                    exec(`sudo ipfw add deny src-ip ${ip}`, (error, stdout, stderr, spawn) => {

                        if (error) {
                            return console.log("Please run this application as root");
                        } else {
                            console.log(`(${device}) - TCP ( ${ip} ) Has been blocked`);
                        }
                    });
                });
            } else {
                return console.log("Something went wrong, cannot identify what device are you using right now.");
            }
            break;
        case '3':
            return process.exit(1);
            break;
        default:
            return console.log("Please input the correct statement");
    }
});
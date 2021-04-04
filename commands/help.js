function helpexecutor() {
    console.log(`List of all the commands :
                        1. view tree <dirname>
                        2. view flat <dirname>
                        3. organize <dir name>/-
                        4. help`)
}

module.exports = {
    help : helpexecutor
}
import _ from "lodash";

export const prepareConfig = (config) => {
    config.noteToKey = config.noteToKey.map(m => _.merge(m, {required: {notes: [], controls: {}}}))
        .map(m => {
            let priority = 0;
            for (const [key, value] of Object.entries(m.required)) {
                priority += Object.keys(value).length
            }
            return {
                ...m,
                priority
            }
        })
        .sort((a, b) => b.priority - a.priority)

    return config;
}

export const qwertyConfig = {
    name: "QWERTY",
    noteToKey: [
        {
            note: "C2",
            key: "a"
        },
        {
            note: "D2",
            key: "b"
        },
        {
            note: "E2",
            key: "c"
        },
        {
            note: "F2",
            key: "d"
        },
        {
            note: "G2",
            key: "e"
        },
        {
            note: "A2",
            key: "f"
        },
        {
            note: "B2",
            key: "g"
        },
        {
            note: "C3",
            key: "h"
        },
        {
            note: "D3",
            key: "i"
        },
        {
            note: "E3",
            key: "j"
        },
        {
            note: "F3",
            key: "k"
        },
        {
            note: "G3",
            key: "l"
        },
        {
            note: "A3",
            key: "m"
        },
        {
            note: "B3",
            key: "n"
        },
        {
            note: "C4",
            key: "o"
        },
        {
            note: "D4",
            key: "p"
        },
        {
            note: "E4",
            key: "q"
        },
        {
            note: "F4",
            key: "r"
        },
        {
            note: "G4",
            key: "s"
        },
        {
            note: "A4",
            key: "t"
        },
        {
            note: "B4",
            key: "u"
        },
        {
            note: "C5",
            key: "v"
        },
        {
            note: "D5",
            key: "w"
        },
        {
            note: "E5",
            key: "x"
        },
        {
            note: "F5",
            key: "y"
        },
        {
            note: "G5",
            key: "z"
        },
        {
            note: "C2",
            key: "A",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "D2",
            key: "B",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "E2",
            key: "C",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "F2",
            key: "D",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "G2",
            key: "E",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "A2",
            key: "F",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "B2",
            key: "G",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "C3",
            key: "H",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "D3",
            key: "I",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "E3",
            key: "J",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "F3",
            key: "K",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "G3",
            key: "L",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "A3",
            key: "M",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "B3",
            key: "N",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "C4",
            key: "O",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "D4",
            key: "P",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "E4",
            key: "Q",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "F4",
            key: "R",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "G4",
            key: "S",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "A4",
            key: "T",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "B4",
            key: "U",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "C5",
            key: "V",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "D5",
            key: "W",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "E5",
            key: "X",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "F5",
            key: "Y",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
        {
            note: "G5",
            key: "Z",
            required: {
                controls: {
                    "64": 127
                }
            }
        },
    ]
}
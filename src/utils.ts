

export function generate(){
    const subset = "nnvjnefwgnveiojngvo2984298";
    const length = 5;
    let id = "";
    for(let i =0;i<length ;i++){
        id += subset[Math.floor(Math.random() * subset.length)];

    }
    return id;


}


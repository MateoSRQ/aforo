function convertToRoman(num: number) {
    let roman : Record<string, number> = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var str = '';

    for (var i of Object.keys(roman)) {
        var q = Math.floor(num / roman[i]);
        num -= q * roman[i];
        str += i.repeat(q);
    }

    return str;
}
const colors = [
    '#B4D6D3', '#AA78A6', '#8FB8ED', '#A2AD91',
    '#EAF6FF', '#627264', '#AFD0D6', '#A7B0CA',
    '#DEE2D6', '#e16853', '#8fbac6', '#3a556f',
]
const mmax = (matriz: any, type?: boolean) => {
    let datasum = matriz[matriz.length - 1];

    let max = 0;
    let maxrow = ''
    let lastrow = ''
    let result = []
    Object.keys(datasum).forEach(function (key, index) {
        if (datasum[key].data > max) {
            max = datasum[key].data
            maxrow = key
        }
        lastrow = key
    })
    if (type) maxrow = lastrow

    console.log('table')
    console.log(matriz)
    console.log(maxrow)

    for (let i=0; i< matriz.length - 1; i++) {
        if (matriz[i][maxrow].data) {
            result.push(matriz[i][maxrow].data);

        }
    }

    console.log('max row')
    console.log(result)

    return result
}
const calcularMatriz = (ciclos: number, columnas: number, inicial: number, semestre: number,
                        crecimiento: number, desercion: number[]) => {
    let data = []
    let _initial = inicial
    let index = 0;

    let totalC: Record<string, { data: number }> = {}
    for (let i = 1; i <= columnas; i++) {
        totalC['ciclo' + i] = {data: 0}
    }

    for (let i = 1; i <= columnas; i++) {
        let _row: Record<string, { data: number, index?: number }> = {}
        for (let i = 1; i <= columnas; i++) {
            _row['ciclo' + i] = {data: 0}
        }
        for (let j = 1; j <= columnas && j <= (ciclos + i - 1); j++) {
            if (j == i) {
                index = 0;
                _row['ciclo' + j] = {
                    data: Math.round(_initial * ((j % 2) ? 1 : semestre)),
                    index: index
                }
                if ((j % 2) == 0) {
                    _initial += Math.round(_initial * crecimiento)
                }
                totalC['ciclo' + j].data += _row['ciclo' + j].data
            }
            else if (j > i && j <= columnas) {
                _row['ciclo' + j] = {
                    data: Math.round(_row['ciclo' + (j - 1)].data * ((1 - desercion[j - i - 1]))),
                    index: ++index%(columnas)
                }
                totalC['ciclo' + j].data += Math.round(_row['ciclo' + (j - 1)].data * ((1 - desercion[j - i - 1])))
            }
        }
        data.push(_row)
    }
    data.push(totalC)
    return data;
}
const columnas = (columnas: number, width: number, height: number) => {
    let columns = []
    for (let i = 1; i <= columnas; i++) {
        let column = {
            title: convertToRoman(i),
            dataIndex: 'ciclo' + i,
            key: 'ciclo' + i,
            render(text: any, record: any) {
                if (record['ciclo' + i].data.toString().indexOf("%") != -1) {
                    let n = parseFloat(record['ciclo' + i].data.toString().substring(0, record['ciclo' + i].data.toString().length - 1))
                    return {
                        props: {
                            style: {
                                width: width + 'px',
                                textAlign: 'center',
                                lineHeight: height + 'px',
                                padding: '2px',
                                color: (n >= 100) ? 'red' : 'blue'
                            },
                        },
                        children: <div>{record['ciclo' + i].data}</div>,
                    };

                } else {

                    return {
                        props: {
                            style: {
                                width: '80px',
                                textAlign: 'center',
                                lineHeight: '20px',
                                padding: '2px',
                                background: colors[record['ciclo' + i].index % columnas]
                            },
                        },
                        children: <div>{record['ciclo' + i].data}</div>,
                    };
                }
            }
        }
        columns.push(column)
    }
    return columns;
}
const calcularAforo = (matriz: any, coeficientes: any, aforo_promedio: number, asistencia: number) => {
    const _max = mmax(matriz, true)
    let result = []
    for (let i=0; i<_max.length; i++)  {
        for (let i=0; i<_max.length; i++) {
            result.push(Math.ceil(_max[i] / aforo_promedio) * coeficientes[i] * asistencia)
        }
    }
    return result
}

const calcularMax = (matriz: any) => {

}

export {calcularMatriz, columnas, calcularAforo, mmax}
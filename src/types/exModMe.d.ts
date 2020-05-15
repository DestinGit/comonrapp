declare module 'ex-mod-mes' {
    interface ExModMesOptions {
        category: string[]
    }

    interface ExModMe {
        name: string,
        uniquename: string,
        secondPerShot: number
        damaPerShot: number[]
    }
    
    class ExModMes extends Array<ExModMe>{
        constructor(options: ExModMesOptions)
    }

    export = ExModMes;
}
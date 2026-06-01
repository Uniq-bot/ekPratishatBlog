

export const useDebounce= (fn:any, delay:any) =>{
    let timeout:any;

    return function(...args:any){
        clearTimeout(timeout);

        timeout= setTimeout(()=>{
            fn(...args)
        }, delay)
    }

}
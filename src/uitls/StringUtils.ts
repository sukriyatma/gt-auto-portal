export const joinStr = (style: string[]) => style.join(' ')

export const convertNumsToMoneyFormat = (nums: number) => {
    const strNums = nums.toString()
    return strNums.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
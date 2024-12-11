import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Sorting algorithms
export function quickSort<T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(item => 
    order === 'asc' ? 
      String(item[key]) < String(pivot[key]) : 
      String(item[key]) > String(pivot[key])
  );
  const middle = arr.filter(item => String(item[key]) === String(pivot[key]));
  const right = arr.filter(item => 
    order === 'asc' ? 
      String(item[key]) > String(pivot[key]) : 
      String(item[key]) < String(pivot[key])
  );

  return [...quickSort(left, key, order), ...middle, ...quickSort(right, key, order)];
}

export function mergeSort<T>(arr: T[], key: keyof T): T[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), key);
  const right = mergeSort(arr.slice(mid), key);

  return merge(left, right, key);
}

function merge<T>(left: T[], right: T[], key: keyof T): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (String(left[leftIndex][key]) <= String(right[rightIndex][key])) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

export function shellSort<T>(arr: T[], key: keyof T): T[] {
  const n = arr.length;
  let gap = Math.floor(n / 2);
  
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      while (j >= gap && Number(arr[j - gap][key]) > Number(temp[key])) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  
  return arr;
}

// Binary search (recursive)
export function binarySearch<T>(arr: T[], key: keyof T, value: any, start = 0, end = arr.length - 1): number {
  if (start > end) return -1;
  
  const mid = Math.floor((start + end) / 2);
  
  if (String(arr[mid][key]) === String(value)) return mid;
  if (String(arr[mid][key]) > String(value)) return binarySearch(arr, key, value, start, mid - 1);
  return binarySearch(arr, key, value, mid + 1, end);
}
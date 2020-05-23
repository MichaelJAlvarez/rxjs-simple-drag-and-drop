import { of, fromEvent } from 'rxjs'; 
import {Observable} from 'rxjs/Observable';
import { concatAll, map, takeUntil } from 'rxjs/operators';
import './style.css';

const container = document.getElementById('parent');
const draggable = document.getElementById('draggable');

// Events
const mouseDowns$ = fromEvent(draggable, 'mousedown');
const mouseMoves$ = fromEvent(document, 'mousemove');
const mouseUps$ = fromEvent(document, 'mouseup');

const drags = mouseDowns$.pipe(
  map(() => {
    return mouseMoves$.pipe(takeUntil(mouseUps$))
  }),
  concatAll()
);


drags.forEach((e) => {
  draggable.style.left = e.clientX + 'px';
  draggable.style.top = e.clientY + 'px';
})
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../../Redux/FilterSlice';
import css from '../Filter/filter.module.css';
export function Filters() {
  const dispatch = useDispatch();

  return (
    <>
      <label className={css.label}>
        Search
        <input
          onChange={event =>
            dispatch(setFilterValue(event.currentTarget.value))
          }
          className={css.input}
          type="search"
          name="filter"
        ></input>
      </label>
    </>
  );
}

const CheckMenu = (props) => {
  const { checked, onChange } = props;
  return (
    <div className="menu-check">
      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
};
export default CheckMenu;

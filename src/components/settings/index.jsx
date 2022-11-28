import { useEffect, useState } from "react";

const Setting = ({
  limit,
  settingTitle,
  name,
  settingId,
  setSettingInfo,
  handleClick,
  timeSetting = false,
}) => {
  const [newLimit, setNewLimit] = useState(0);

  useEffect(() => {
    setNewLimit(limit);
  }, [settingId]);

  return (
    <div className="float-right ">
      {settingTitle} :
      <div className="d-flex align-items-center mt-2">
        {!timeSetting ? (
          <input
            name={name}
            type="Number"
            min={0}
            value={newLimit || 0} //this prevents from uncontrolled input
            className="form-control "
            onChange={(e) => setNewLimit(e.target.value)}
          />
        ) : (
          <>
            <div className="d-flex">
              <label htmlFor="OrderFrom">From: </label>
              <input
                name="OrderFrom"
                id="OrderFrom"
                type="time"
                value={newLimit?.OrderFrom}
                className="form-control "
                onChange={(e) =>
                  setNewLimit((prev) => ({
                    ...prev,
                    OrderFrom: e.target.value,
                  }))
                }
              />
            </div>

            <div className="d-flex ml-2">
              <label htmlFor="OrderTo">To: </label>
              <input
                name="OrderTo"
                id="OrderTo"
                type="time"
                value={newLimit?.OrderTo}
                className="form-control ml-2"
                onChange={(e) =>
                  setNewLimit((prev) => ({ ...prev, OrderTo: e.target.value }))
                }
              />
            </div>
          </>
        )}

        <button
          className="btn btn-outline-info ml-2"
          type="submit"
          onClick={() =>
            handleClick(settingId, newLimit)
              .then(() =>
                setSettingInfo({
                  desc: `${settingTitle} ${
                    newLimit instanceof Object
                      ? newLimit?.OrderFrom + " - " + newLimit?.OrderTo
                      : newLimit
                  } `,
                  type: "success",
                })
              )
              .catch((e) => console.log(e))
          }
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Setting;

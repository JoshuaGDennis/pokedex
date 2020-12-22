import "./Search.scss";
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import { OverlayTrigger } from "react-bootstrap";
import React, { ChangeEvent, useState } from "react";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const checkCondition = (condition: boolean, message: string) => {
    if (condition) {
      setErrors((s) => s.concat([message]));
    } else {
      const index = errors.indexOf(message);

      if (index) {
        setErrors((s) => s.splice(index, 1));
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    checkCondition(value.length === 20, "Maximum of 20 characters");
    checkCondition(!value.match(/^[A-Za-z]+$/g), "Must be a single word!");

    if (!value.length || value === "") {
      setErrors([]);
    }

    setSearchValue(value);
  };

  return (
    <Dropdown className="search-control">
      <div className={`search-control-inner ${!!errors.length ? "error" : ""}`}>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchValue}
          onChange={handleInputChange}
          maxLength={20}
        />
        {!!errors.length && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="search-control-error">
                {errors.map((e) => (
                  <p key={e}>{e}</p>
                ))}
              </Tooltip>
            }
          >
            <div className="search-control-error" />
          </OverlayTrigger>
        )}
        <Dropdown.Toggle split className="search-control-options" />
      </div>
      <Dropdown.Menu>
        <Dropdown.Item>Option one</Dropdown.Item>
        <Dropdown.Item>Option two</Dropdown.Item>
        <Dropdown.Item>Option three</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Search;

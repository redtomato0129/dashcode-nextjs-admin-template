import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { updateTask, toggleEditModal } from "./store";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import FormGroup from "@/components/ui/FormGroup";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const assigneeOptions = [
  {
    value: "mahedi",
    label: "Mahedi Amin",
    image: "/assets/images/avatar/av-1.svg",
  },
  {
    value: "sovo",
    label: "Sovo Haldar",
    image: "/assets/images/avatar/av-2.svg",
  },
  {
    value: "rakibul",
    label: "Rakibul Islam",
    image: "/assets/images/avatar/av-3.svg",
  },
  {
    value: "pritom",
    label: "Pritom Miha",
    image: "/assets/images/avatar/av-4.svg",
  },
];
const options = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
  {
    value: "update",
    label: "update",
  },
];

const OptionComponent = ({ data, ...props }) => {
  //const Icon = data.icon;

  return (
    <components.Option {...props}>
      <span className="flex items-center space-x-4">
        <div className="flex-none">
          <div className="h-7 w-7 rounded-full">
            <img
              src={data.image}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <span className="flex-1">{data.label}</span>
      </span>
    </components.Option>
  );
};

const EditTaskModal = () => {
  const { editModal, editItem } = useSelector((state) => state.kanban);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Name is required"),
      assign: yup.mixed().required("Assignee is required"),
      startDate: yup
        .date()
        .required("Start date is required")
        .min(new Date(), "Start date must be greater than today"),
      endDate: yup
        .date()
        .required("End date is required")
        .min(new Date(), "End date must be greater than today"),
    })
    .required();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),

    mode: "all",
  });

  useEffect(() => {
    reset(editItem);
  }, [editModal]);

  const onSubmit = (data) => {
    dispatch(
      updateTask({
        id: editItem?.id,
        name: data.name,
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        assignee: data.assign,
        category: null,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        progress: Math.floor(Math.random() * (100 - 10 + 1) + 10),
      })
    );
    dispatch(
      toggleEditModal({
        editModal: false,
        task: null,
      })
    );
  };

  return (
    <Modal
      title="Edit Kanban Project"
      activeModal={editModal}
      onClose={() =>
        dispatch(
          toggleEditModal({
            editModal: false,
            task: null,
          })
        )
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <FormGroup error={errors.name}>
          <input
            type="text"
            defaultValue={editItem?.name}
            className="form-control py-2"
            {...register("name")}
          />
        </FormGroup>
        <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
          <FormGroup
            label="Start Date"
            id="default-picker"
            error={errors.startDate}
          >
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Flatpickr
                  className="form-control py-2"
                  id="default-picker"
                  placeholder="yyyy, dd M"
                  value={startDate}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
              )}
            />
          </FormGroup>
          <FormGroup
            label="End Date"
            id="default-picker2"
            error={errors.endDate}
          >
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <Flatpickr
                  className="form-control py-2"
                  id="default-picker2"
                  placeholder="yyyy, dd M"
                  value={endDate}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
              )}
            />
          </FormGroup>
        </div>
        <div className={errors.assign ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s22">
            Assignee
          </label>
          <Controller
            name="assign"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={assigneeOptions}
                styles={styles}
                className="react-select"
                classNamePrefix="select"
                isSearchable={false}
                isMulti
                defaultValue={assigneeOptions[0]}
                components={{
                  Option: OptionComponent,
                }}
                id="icon_s22"
              />
            )}
          />
          {errors.assign && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.assign?.message || errors.assign?.label.message}
            </div>
          )}
        </div>

        <div className={errors.tags ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s1">
            Tag
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                styles={styles}
                className="react-select"
                classNamePrefix="select"
                isMulti
                id="icon_s1"
              />
            )}
          />
          {errors.assign && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.tags?.message || errors.tags?.label.message}
            </div>
          )}
        </div>
        <Textarea label="Description" placeholder="Description" />

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;

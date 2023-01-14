import styled from "@emotion/styled";
import CustomDrawer from "@components/common/drawer/CustomDrawer";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DatePicker, DatePickerProps, Input } from "antd";
import { ActionAddScheduleRequest } from "@store/slice/Calendar.slice.type";
import { RangePickerProps } from "antd/es/date-picker";

const { RangePicker } = DatePicker;

const Container = styled.div``;
const FormContainer = styled.form`
  padding: 2rem;
  box-sizing: border-box;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: center;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #333333;
`;

interface Props {
  title: string;
}

const CalendarScheduleAddDrawer = ({ title }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { register, watch, handleSubmit, setValue } = useForm<ActionAddScheduleRequest>();

  function onDrawerClose() {
    setOpen(false);
  }

  function onChangeScheduleRange(scheduleDays: DatePickerProps["value"] | RangePickerProps["value"]) {
    if (scheduleDays && Array.isArray(scheduleDays)) {
      console.log(scheduleDays[0]);
      // setValue("startDate")
    }
  }

  function onValid(data: any) {}

  useEffect(() => {
    if (Boolean(title)) {
      setOpen(true);
    }
  }, [title]);

  return (
    <Container>
      <CustomDrawer drawerTitle={Boolean(title) ? title : "제목 없음"} open={open} setOpen={setOpen} onClose={onDrawerClose}>
        <FormContainer>
          <FormRow>
            <Label>일정 제목</Label>
            <Input type={"text"} {...register("title", { required: "제목은 필수 입력입니다." })} />
          </FormRow>
          <FormRow>
            <Label>일정 선택</Label>
            <RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" onOk={onChangeScheduleRange} />
          </FormRow>
          <FormRow>
            <Label>일정 설명</Label>
            <Input type={"text"} {...register("description")} />
          </FormRow>
        </FormContainer>
      </CustomDrawer>
    </Container>
  );
};

export default CalendarScheduleAddDrawer;

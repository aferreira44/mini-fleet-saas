import json


def get_vehicles():
    with open("data.json", "r") as f:
        return json.load(f)["vehicles"]


def update_vehicle_status(vehicle_id: int, body: dict):
    with open("data.json", "r") as f:
        data = json.load(f)
    data["vehicles"][vehicle_id - 1]["status"] = body["status"]
    with open("data.json", "w") as f:
        json.dump(data, f)
    return data["vehicles"][vehicle_id - 1]

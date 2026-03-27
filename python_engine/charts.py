import pandas as pd
import matplotlib.pyplot as plt

def create_chart(file_path, chart_type="auto"):

    df = pd.read_excel(file_path)

    numeric_cols = df.select_dtypes(include='number').columns
    non_numeric_cols = df.select_dtypes(exclude='number').columns

    if len(numeric_cols) == 0:
        return "No numeric data found"

    if len(non_numeric_cols) > 0:
        x_col = non_numeric_cols[0]
    else:
        x_col = df.columns[0]

    y_col = numeric_cols[0]

    plt.figure()

    if chart_type == "line":
        plt.plot(df[x_col], df[y_col])
    elif chart_type == "pie":
        plt.pie(df[y_col], labels=df[x_col], autopct="%1.1f%%")
    else:
        plt.bar(df[x_col], df[y_col])

    plt.xlabel(x_col)
    plt.ylabel(y_col)
    plt.title(f"{y_col} vs {x_col}")

    plt.savefig("chart.png")
    plt.close()

    return "Chart generated successfully"
